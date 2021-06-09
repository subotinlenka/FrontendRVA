import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Obrazovanje } from 'src/app/models/obrazovanje';
import { Radnik } from 'src/app/models/radnik';
import { ObrazovanjeService } from 'src/app/services/obrazovanje.service';
import { RadnikService } from 'src/app/services/radnik.service';

@Component({
  selector: 'app-radnik-dialog',
  templateUrl: './radnik-dialog.component.html',
  styleUrls: ['./radnik-dialog.component.css']
})
export class RadnikDialogComponent implements OnInit, OnDestroy {

  public flag: number;
  obrazovanja: Obrazovanje[];
  obrazovanjeSubscription: Subscription;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RadnikDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Radnik,
    public radnikService: RadnikService, 
    public obrazovanjeService: ObrazovanjeService) { }

  ngOnDestroy(): void {
    this.obrazovanjeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.obrazovanjeSubscription = this.obrazovanjeService.getAllObrazovanja().subscribe(
      data => {
        this. obrazovanja= data;
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' +error.message);
    }
  }

  compareTo(a,b) {
    return a.id == b.id;
  }

  public add(): void {
    this.radnikService.addRadnika(this.data).subscribe(() => {
      this.snackBar.open('Uspešno dodat radnik: ' + this.data.ime + ' ' + this.data.prezime, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' +error.message);
      this.snackBar.open('Došlo je do greške prilikom dodavanja novog radnika: ' + this.data.ime + ' ' + this.data.prezime, 'Zatvori', {
        duration: 2500
      })
    }
  }

  public update(): void {
    this.radnikService.updateRadnika(this.data).subscribe(() => {
      this.snackBar.open('Uspešno modifikovan radnik: ' + this.data.ime + ' ' + this.data.prezime, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' +error.message);
      this.snackBar.open('Došlo je do greške prilikom modifikacije postojećeg radnika: ' + this.data.ime + ' ' + this.data.prezime, 'Zatvori', {
        duration: 2500
      })
    }
  }

  public delete(): void {
    this.radnikService.deleteRadnika(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisan radnik: ' + this.data.ime + ' ' + this.data.prezime, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' +error.message);
      this.snackBar.open('Došlo je do greške prilikom brisanja radnika: ' + this.data.ime + ' ' + this.data.prezime, 'Zatvori', {
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
