import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartTestComponent } from './chart-test/chart-test.component';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { TabJsonComponent } from './tab-json/tab-json.component';
import { ComponentTabWifiComponent } from './component-tab-wifi/component-tab-wifi.component';
import { ComponentTabBleComponent } from './component-tab-ble/component-tab-ble.component';
import { ReturnsJsonArrayService } from './returns-json-array.service';
import { ComponentTabRtlComponent } from './component-tab-rtl/component-tab-rtl.component';
import { VulnerabiliteWifiComponent } from './vulnerabilite-wifi/vulnerabilite-wifi.component';
import { VulnerabiliteBleComponent } from './vulnerabilite-ble/vulnerabilite-ble.component';
import { VulnerabiliteRtlComponent } from './vulnerabilite-rtl/vulnerabilite-rtl.component';



@NgModule({
  declarations: [
    AppComponent,
    ChartTestComponent,
    TabJsonComponent,
    ComponentTabWifiComponent,
    ComponentTabBleComponent,
    ComponentTabRtlComponent,
    VulnerabiliteWifiComponent,
    VulnerabiliteBleComponent,
    VulnerabiliteRtlComponent
    
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpModule
  ],
  providers: [ReturnsJsonArrayService],
  bootstrap: [AppComponent]
})
export class AppModule { }
