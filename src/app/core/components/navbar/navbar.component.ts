import { Component, OnInit} from '@angular/core';
import { Person } from '@core/modelo/producto';
import { GeneralService } from '@shared/services/general.service';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styles: [],
})
export class NavbarComponent implements OnInit {

  public persona: Person;
  constructor(protected generalService: GeneralService) { }

  ngOnInit() {
    this.persona = this.generalService.getToken();
  }

}
