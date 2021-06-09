import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Obrazovanje } from 'src/app/models/obrazovanje';
import { ObrazovanjeService } from 'src/app/services/obrazovanje.service';

@Component({
  selector: 'app-obrazovanje-dialog',
  templateUrl: './obrazovanje-dialog.component.html',
  styleUrls: ['./obrazovanje-dialog.component.css']
})

export class ObrazovanjeDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ObrazovanjeDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Obrazovanje,
              public obrazovanjeService: ObrazovanjeService) { }

  ngOnInit(): void {
  }

  public add():void {
    this.obrazovanjeService.addObrazovanje(this.data).subscribe(() => { 
      this.snackBar.open('Uspešno dodato obrazovanje: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom dodavanja novog obrazovanja.', 'Zatvori.', {
        duration: 2500
      })
    }
  }

  public update(): void {
    this.obrazovanjeService.updateObrazovanje(this.data).subscribe(() => {
      this.snackBar.open('Uspešno modifikovano obrazovanje: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom modifikacije postojećeg obrazovanja.', 'Zatvori.', {
        duration: 2500
      })
    }
  }

  public delete(): void {
    this.obrazovanjeService.deleteObrazovanje(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisano obrazovanje: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom brisanja obrazovanja.', 'Zatvori.', {
        duration: 2500
      })
    }
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori.', {
      duration: 1000
    })
  }

}
