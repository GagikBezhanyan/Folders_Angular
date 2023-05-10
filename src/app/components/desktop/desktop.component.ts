import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { folders } from 'datebase/db';
import { IFolder } from 'src/app/models/model';
import { FoldersService } from 'src/app/services/folders.service';
import { environment } from 'src/environments/environment';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class DesktopComponent implements OnInit{
  @ViewChild('popup') popup!: ElementRef;
  public form: FormGroup = new FormGroup({});
  public isFolderNameGiven: boolean = true;
  private widthPopup: number = 150;
  private heightPopup: number = 40;
  private iconUrl: string = "/assets/images/folder_empty.png";
  public data: IFolder[] = [];
  public path: string = 'Folders';
  public fold = folders

  public current: any;

  constructor(private foldersService: FoldersService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      folderName: 'New Folder'
    })
    // this.data = this.fold;
    
    let dataString = localStorage.getItem('folders');
    if(dataString) {
      this.data = JSON.parse(dataString);
    }
  }

  openPopup(event: MouseEvent) {
    event.preventDefault();
    
    let x = window.innerWidth - this.widthPopup < event.clientX ? window.innerWidth - this.widthPopup - 20 : event.clientX;
    let y = window.innerHeight - this.heightPopup < event.clientY ? window.innerHeight - this.heightPopup - 10 : event.clientY;

    this.popup.nativeElement.style.left = `${x}px`;
    this.popup.nativeElement.style.top = `${y}px`;

    this.popup.nativeElement.classList.add('show');
  }

  closePopup() {
    this.popup.nativeElement.classList.remove('show');
    if (this.isFolderNameGiven === false) {
      this.saveName();
    }
  }

  createFolder(event: MouseEvent) {
    event.stopPropagation();
    this.closePopup();
    this.isFolderNameGiven = false;
    
    let item = {
      "icon": this.iconUrl,
      "name": 'New Folder',
      "subFolders": [],
      "id": this.data.length + 1,
    }
    // this.current.push(item);

    this.data.push(item);
    localStorage.setItem('folders', JSON.stringify(this.data));
  }

  saveName() {
    this.isFolderNameGiven = true;
    this.data.pop();
    let item = {
      "icon": this.iconUrl,
      "name": this.form.value.folderName.trim(),
      "subFolders": [],
      "id": this.data.length + 1,
    }
    this.data.push(item);
    localStorage.setItem('folders',JSON.stringify(this.data));

    this.form.patchValue({
      folderName: 'New Folder'
    })
  }

  focusedInput(event: MouseEvent) {
    event.stopPropagation();
  }

  openFolder(item: IFolder) {
    this.current = this.data;
    this.data = item.subFolders;
    this.path = `${this.path}/${item.name}`;
  }

  getFolder() {

  }

  undo() {
    console.log(this.path.split('/'));
  }

  redo() {
    console.log(this.path.split('/'));
  }

}
