let unirest = require('unirest')
let minValue = require('./minValue')

function SearchFlightsController(req, res){
    
    const baseUrl = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
    const API_KEY = process.env.API_KEY
    const country = 'al'
    const currency = 'eur'
    const locale = 'en-us'
    const originplace = 'al'
    const destinationplace = 'es'
    const outboundpartialdate = '2019-08'
    const inboundpartialdate = '2019-09'
    
    const url = `${baseUrl}/apiservices/browseroutes/v1.0/${country}/${currency}/${locale}/${originplace}/${destinationplace}/${outboundpartialdate}/${inboundpartialdate}`

    let request = unirest('GET', url)
    
   

   request.headers({
    "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    "x-rapidapi-key": API_KEY
  })
   
    
    this.getFlights = async () => {
        try {
           
         request.end(function (response) {

              console.log('inside');
              
            if (response.error) {
                console.log(response.error);
            }

            const data =  response.body
            return res.send(data)
        })

        
         } catch (error) {
             console.log(error.message)
            res.send(error.message)
        }

    }
 
 
    this.getCheapestFlight = async () => {
     try {
           
           request.end(function (response) {
               if (response.error) {
                console.log(response.error);
            }
            
            

            const data =  response.body

            const prices = data.Quotes.map(quote => quote.MinPrice)
            const lowestPrice = minValue(prices)
           
            let quote = data.Quotes.find(Quote => Quote.MinPrice == lowestPrice)
            const price = quote.MinPrice
            
            let carrier = data.Carriers.find(Carrier =>  Carrier.CarrierId == quote.OutboundLeg.CarrierIds[0])
            const carrierName = carrier.Name
           
            let originPlace = data.Places.find(Place =>  Place.PlaceId == quote.OutboundLeg.OriginId)
            const originName = originPlace.Name
           
            let destinationPlace = data.Places.find(Place =>  Place.PlaceId == quote.OutboundLeg.DestinationId)
            const destinationName = destinationPlace.Name
           
            const departureDate = quote.OutboundLeg.DepartureDate
            const returnDate = quote.InboundLeg.DepartureDate
           
            const result = {
                "Price": price,
                "Airline Company": carrierName,
                "Origin": originName,
                "Destination": destinationName,
                "Departure date": departureDate,
                "Return date": returnDate
            }
                    
           return res.send(result)
    })
        
         } catch (error) {
             console.log(error.message)
            res.send(error.message)
        }

    }
  }
  


module.exports = SearchFlightsController
