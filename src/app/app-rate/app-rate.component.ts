import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface IRateOptions {
  rates: number,
  text?: string,
}

@Component({
  selector: 'app-rate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-rate.component.html',
  styleUrl: './app-rate.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AppRateComponent
    }
  ]
})
export class AppRateComponent implements ControlValueAccessor, OnInit{

  @Input() options!: IRateOptions;

  public currentRate!: number;

  public ratesArr: number[] = [];

  public disabled: boolean = false;
  public touched: boolean = false;

  onChange = (curretnRate: number) => {};

  onTouched = () => {};

  ngOnInit(): void {
    this.fillRatesArr();
  }

  public onRate(index: number): void {
    this.markAsTouched();
    if (!this.disabled) {
      this.currentRate = index;
      this.onChange(this.currentRate)
    }
  }

  // ControlValueAccessor methods start
  public writeValue(rate: number): void {
    this.currentRate = rate;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
  // ControlValueAccessor metods end

  private fillRatesArr() {
    let cond = true;
    let count = 1;

    while(cond) {
      this.ratesArr.push(count);
      count ++;
      if (count === this.options.rates) {
        cond = false
      }
    }
  }
}
