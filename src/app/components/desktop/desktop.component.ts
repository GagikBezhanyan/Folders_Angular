import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IFolder } from 'src/app/models/model';
import { FoldersService } from 'src/app/services/folders.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class DesktopComponent implements OnInit{
  @ViewChild('popup') popup!: ElementRef;
  public data: IFolder[] = [];
  public form: FormGroup = new FormGroup({});
  public isFolderNameGiven: boolean = true;
  private iconUrl: string = "/assets/images/folder_empty.png";
  private url = environment.apiUrl + environment.foldersUrl
  private id: number | undefined = 1;

  constructor(private foldersService: FoldersService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getFolders();
    this.form = this.fb.group({
      folderName: 'New Folder'
    })
  }

  getFolders() {
    this.foldersService.getData<IFolder[]>().subscribe((res: IFolder[]) => {
      this.data = res;
    })
  }

  createFolder(event: MouseEvent) {
    event.stopPropagation();
    this.isFolderNameGiven = false;
    let newFolder: IFolder = {
      icon: this.iconUrl,
      name: "",
      subFolders: []
    }
    this.foldersService.postData<IFolder>(newFolder).subscribe((res: IFolder) => {
      this.getFolders();
      this.id = res.id;
    })
  }

  save() {
    this.isFolderNameGiven = true;
    let newFolder: IFolder = {
      icon: this.iconUrl,
      name: this.form.value.folderName,
      subFolders: []
    }
    this.foldersService.putData<IFolder>(this.id, newFolder).subscribe((res: IFolder) => {1
      this.getFolders();
    })
  }

  openPopup(event: MouseEvent) {
    event.preventDefault();

    const x = event.clientX;
    const y = event.clientY;

    this.popup.nativeElement.style.left = `${x}px`;
    this.popup.nativeElement.style.top = `${y}px`;

    this.popup.nativeElement.classList.add('show');
  }

  closePopup(event: MouseEvent) {
    this.popup.nativeElement.classList.remove('show');
    // if (this.isFolderNameGiven === false) {
    //   this.save();
    // }
  }

  openFolder(name: string, subfolder: IFolder[]) {
    this.data = subfolder;
  }

}
