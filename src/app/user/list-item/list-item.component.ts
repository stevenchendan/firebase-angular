import {Component, Input, OnInit} from '@angular/core';
import {User} from '../user.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() user: User
  constructor() { }

  ngOnInit() {
  }

}
