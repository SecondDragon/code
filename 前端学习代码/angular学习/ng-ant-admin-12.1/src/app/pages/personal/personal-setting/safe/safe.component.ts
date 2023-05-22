import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'app-safe',
  templateUrl: './safe.component.html',
  styleUrls: ['./safe.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SafeComponent implements OnInit {
  @Input() data!: { label: string };
  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
