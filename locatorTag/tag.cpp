/**
 * Locator tag
 * IoT Particle code
**/

//On-board LED pin
const int NETWORKLED  = D7;

const int REQUESTLED = D0;
//const int SENDINGLED = D1;

//Account ID
char* accountID;
//Delay in seconds to wait when network is unavailable before checking again
int networkUnavailableDelay;
//Delay in seconds to wait to report in when network is available
int reportingIntervalDelay;

//Initialize Photon device
void setup() {
    //Set LEDSIGNAL mode to output 
    pinMode(NETWORKLED, OUTPUT);
    Particle.subscribe("particle/device/ip", locationHandler);
    Particle.publish("particle/device/ip");
    reportingIntervalDelay = 1;
    networkUnavailableDelay = 1;
}

void locationHandler(const char* topic, const char* data) {
    //Send public IP to fetch
    Particle.publish("fetch-locationChanged",String(data), PRIVATE);
}

//Particle event loop
void loop() {
    //Check for network connection
    if (Particle.connected()) {
        //Turn on LED
        digitalWrite(NETWORKLED, HIGH);
        //Publish IP Event to Trigger Location Webhook
        Particle.publish("particle/device/ip");
        //Wait to report in
        delay(reportingIntervalDelay * 1000);
    }
    else  {
        //Turn off LED
        digitalWrite(NETWORKLED, LOW);
        //Wait long period for network to be available
        delay(networkUnavailableDelay * 1000);
    }
}