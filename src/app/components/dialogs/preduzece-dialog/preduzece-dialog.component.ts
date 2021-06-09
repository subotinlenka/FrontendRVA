import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Preduzece } from 'src/app/models/preduzece';
import { PreduzeceService } from 'src/app/services/preduzece.service';


@Component({
  selector: 'app-preduzece-dialog',
  templateUrl: './preduzece-dialog.component.html',
  styleUrls: ['./preduzece-dialog.component.css']
})
export class PreduzeceDialogComponent implements OnInit {

  
  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<PreduzeceDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Preduzece,
              public preduzeceService: PreduzeceService) { }

  ngOnInit(): void { }

  public add():void {
    this.preduzeceService.addPreduzece(this.data).subscribe(() => { 
      this.snackBar.open('Uspešno dodato preduzeće: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom dodavanja novog preduzeća.', 'Zatvori.', {
        duration: 2500
      })
    }
  }

  public update(): void {
    this.preduzeceService.updatePreduzece(this.data).subscribe(() => {
      this.snackBar.open('Uspešno modifikovano preduzeće: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom modifikacije postojećeg preduzeća.', 'Zatvori.', {
        duration: 2500
      })
    }
  }

  public delete(): void {
    this.preduzeceService.deletePreduzece(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisano preduzeće: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom brisanja preduzeća.', 'Zatvori.', {
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
