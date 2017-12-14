# Planty :: The Soggy🌱 - Client 

- reads hygrometer
- starts water pump
- sends mails 
- sends data to API
- optimize hygrometer corrosion by only adding power when measuring
- add ultrasonic water level measurement

## Configuration

### Environment Variables

    API_ENDPOINT : Backend URL
    WATERING_TRIGGER_VALUE : 1024 (dry) - 200 (in water)
    WATERING_TIME : in MS (5000 is a good value)
    MEASURE_INTERVAL : How often should be measured in ms (the more often you measure, faster corrosion on Hygro)
    PLANT_ID : From API
    WATER_TANK_DEPTH: in cm
    
send mail additionaly to api call  
***gmail** account required
    
    MAIL_USER: 'you@gmail.com' 
    MAIL_PASS: 'yourpassword'
    MAIL_RECEIVER: 'yourPlant@your-domain.com'
    



## Todo
- Move to Tessel 2
- Create Authentification Stuff
- Create initialization Script
- Create secure crash system // Shut down all pins
- Create Script to connect Soggy automatically to Web-Server



## Parts

- Arduino [Amazon](https://www.amazon.de/gp/product/B01IHCCKKK/ref=oh_aui_detailpage_o05_s00?ie=UTF8&psc=1) + Raspberry Pi [Amazon](https://www.amazon.de/gp/product/B01DC6MKAQ/ref=oh_aui_detailpage_o03_s01?ie=UTF8&psc=1)
 or Tessel 2 [sparkFun](https://www.amazon.de/gp/product/B01IHCCKKK/ref=oh_aui_detailpage_o05_s00?ie=UTF8&psc=1)
- Hygrometer Pi YL-69 SBT4447 [ebay](http://www.ebay.de/itm/Feuchtigkeitssensor-Blumenerde-Hygrometer-f-Arduino-Raspberry-Pi-YL-69-SBT4447-/171791732904)
- 3-6V Pump [Amazon](https://www.amazon.de/gp/product/B01IA7ILI2/ref=oh_aui_detailpage_o04_s00?ie=UTF8&psc=1)
- Ultra Sonic Sensor HC-SR04 [Amazon](https://www.amazon.de/Keywish-Ultrasonic-Measuring-Transducer-Duemilanove/dp/B072JGNK48/ref=sr_1_1?s=computers&ie=UTF8&qid=1503690225&sr=1-1&keywords=ultrasonic+sensor+hc-sr04)
- BreadBoard [Amazon](https://www.amazon.de/Jumper-Wire-Mit-Breadboard-Female-Female/dp/B073X7GZ1P/ref=sr_1_1?ie=UTF8&qid=1503690205&sr=8-1-spons&keywords=breadboard&psc=1)
- Cable [Amazon](https://www.amazon.de/Aukru-jumper-wire-Steckbrücken-Drahtbrücken/dp/B00MWMEIF2/ref=sr_1_2?s=computers&ie=UTF8&qid=1503690254&sr=1-2&keywords=arduino+kabel) and more Cable [Amazon](https://www.amazon.de/Neuftech-20cm-Steckbrücken-Drahtbrücken-Raspberry/dp/B00NBNIETC/ref=sr_1_3?s=computers&ie=UTF8&qid=1503690254&sr=1-3&keywords=arduino+kabel)
- A beautiful glass of water 🚰
- tape
- a peg

## Tutorials
http://www.instructables.com/id/Automatically-water-your-small-indoor-plant-using-/

https://diyhacking.com/ultrasonic-arduino-water-level-indicator/


## Contribute
If you like please contribute... Any help appreciated :)

---

<div align="center">
  <sub>Created with ❤️ by <a href="https://twitter.com/falsanu">Jan Fanslau</a> </sub>
</div>
