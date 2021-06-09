import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Preduzece } from 'src/app/models/preduzece';
import { Sektor } from 'src/app/models/sektor';
import { PreduzeceService } from 'src/app/services/preduzece.service';
import { SektorService } from 'src/app/services/sektor.service';

@Component({
  selector: 'app-sektor-dialog',
  templateUrl: './sektor-dialog.component.html',
  styleUrls: ['./sektor-dialog.component.css']
})
export class SektorDialogComponent implements OnInit {

  public flag: number;
  preduzeca: Preduzece[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SektorDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Sektor,
    public sektorService: SektorService, 
    public preduzeceService: PreduzeceService) { }

  ngOnInit(): void {
    this.preduzeceService.getAllPreduzeca().subscribe(
      data => {
        this.preduzeca = data;
      }
    );
  }

  compareTo(a,b) {
    return a.id == b.id;
  }

  public add(): void {
    this.sektorService.addSektor(this.data).subscribe(() => {
      this.snackBar.open('Uspešno dodat sektor: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' +error.message);
      this.snackBar.open('Došlo je do greške prilikom dodavanja novog sektora: ' + this.data.naziv, 'Zatvori', {
        duration: 2500
      })
    }
  }

  public update(): void {
    this.sektorService.updateSektor(this.data).subscribe(() => {
      this.snackBar.open('Uspešno modifikovan sektor: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' +error.message);
      this.snackBar.open('Došlo je do greške prilikom modifikacije postojećeg sektora: ' + this.data.naziv, 'Zatvori', {
        duration: 2500
      })
    }
  }

  public delete(): void {
    this.sektorService.deleteSektor(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisan sektor: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' +error.message);
      this.snackBar.open('Došlo je do greške prilikom brisanja sektora: ' + this.data.naziv, 'Zatvori', {
        duration: 2500
      })
    }
  }
  
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori', {
      duration: 1000
    })
  }

}
