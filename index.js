require('dotenv').config()
const Telegraf=require('telegraf')
const {data}=require('./js/getData.js')
const bot=new Telegraf(process.env.BOT_TOKEN)
const Markup=require('telegraf/markup')
const {textHandler}=require("./js/textHandler.js")
const {text}=require("./js/text.js")
const {inlineHandler}=require("./js/inlineHandler.js")
const {quiz}=require("./js/quiz.js")

const rp = require('request-promise');

var request = require('request');
const Extra=require('telegraf/extra')

bot.start(ctx=>
  {
    try{
    const requestOptions = {
      method: 'PUT',
      uri: 'https://api.backendless.com/C7C46BF0-D887-EE41-FFCC-C473E8648400/9579C9DB-155C-4D21-A30D-39190ED05E67/counters/id/increment/get',
      headers: {
        'Content-Type': 'application/json'
      },
      json: true,
    };
    
    rp(requestOptions).then(response => {
      console.log('API call response:', response);
    }).catch((err) => {
      console.log('API call error:', err.message);
    });
  }catch(e)
  {}
  
  ctx.reply(`Hello ${ctx.from.first_name} , Welcome to the fastest COVID-19 Tracker Bot . For more details \nRefer /help`)
  })
bot.help(ctx=>ctx.reply('Here is the complete walk-through about the Bot.\
<b><u>\n\nCommands:</u></b>\n\n\
/start\nWelcome to the Bot !!!\n\n\
/total\nDisplays the live count of COVID-19 cases in India.\n\n\
/statewise\nList of COVID cases of all states in India.\n\n\
/country\nShows the COVID cases in the specified country.\n\n\
/state\nList of COVID cases in particular state.\n\n\
/district\nCount of identified Cases in specific district.\n\n\
/help\nView all available Commands.\n\n\
/about\nInformation about the bot',Extra.HTML()))

bot.command('country',ctx=>ctx.reply('Enter the Country name for which the count is needed :'))

bot.command('state',ctx=>ctx.reply('Enter the State name in India for which the count is needed :'))

bot.command('district',ctx=>ctx.reply('Enter the District name in India for which the count is needed :'))

bot.command('about',ctx=>ctx.reply('Data Source - <a href="https://api.covid19india.org">https://api.covid19india.org</a>\n\n\
Developer Contact = <a href="https://t.me/balarp">Bala Srinyvas R P</a>',Extra.HTML().webPreview(false)))


bot.command('total',ctx=>{
  
    var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
       var tc=json.cases_time_series[json.cases_time_series.length-1].totalconfirmed;
       var tr=json.cases_time_series[json.cases_time_series.length-1].totalrecovered;
       var dc=json.cases_time_series[json.cases_time_series.length-1].dailyconfirmed;
       var dr=json.cases_time_series[json.cases_time_series.length-1].dailyrecovered;
       var dt=json.cases_time_series[json.cases_time_series.length-1].dailydeceased;
       var td=json.cases_time_series[json.cases_time_series.length-1].totaldeceased;
       var date=json.cases_time_series[json.cases_time_series.length-1].date;
       ctx.reply(
        `COVID-19 INDIA updates as on <b>${date}</b>\nTotal Cases <b>${tc}</b> ↗️\nTotal Recovered <b>${tr}</b> ↗️\nToday Confirmed <b>${dc}</b> ↗️\nToday Recovered <b>${dr}</b> ↙️\nToday's Death <b>${dt}</b> ⏺\nTotal Death <b>${td}</b> 🔴\n`,Extra.HTML()
      )

}
)
})
      var north=["Delhi","Haryana","Jammu and Kashmir","Himachal Pradesh","Uttar Pradesh","Punjab","Uttarakhand","Chandigarh"];
      var south=["Andaman and Nicobar Islands","Puducherry","Lakshadweep","Andhra Pradesh","Telangana","Tamil Nadu","Karnataka","Kerala"];
      var east=["Bihar","Jharkhand","Odisha","West Bengal","Assam","Sikkim","Nagaland","Manipur","Mizoram","Meghalaya","Tripura","Arunachal Pradesh"];
      var west=["Rajasthan","Gujarat","Goa","Maharashtra","Madhya Pradesh","Daman and Diu","Ladakh"];
// bot.command('State',ctx=>{
//   var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
//       if (err) {
//         throw err;
//       }
//       var r=""
//       for (i = 1; i <json.statewise.length; i++) {
//         r += json.statewise[i].state;
//         r+=' = <b>'+ json.statewise[i].confirmed+'</b>'
//         r+='(+'+json.statewise[i].deltaconfirmed+')'
//         r+='\n';
//       }
//      ctx.reply(
//      `States Wise Count of Total Confirmed Cases:\n${r}`,Extra.HTML()
//     )

// }
// )
// })


bot.command('statewise',ctx=>ctx.reply('Customized Selection',Markup.keyboard([['All States','North Region','South Region'],['East Region','West Region']]).resize().extra()))



bot.hears('All States',ctx=>{
  var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
      if (err) {
        throw err;
      }
      var r=""
      for (i = 1; i <json.statewise.length; i++) {
        r += json.statewise[i].state;
        r+=' = <b>'+ json.statewise[i].confirmed+'</b>'
        r+='(+'+json.statewise[i].deltaconfirmed+')'
        r+='\n';
      }
     ctx.reply(
     `States Wise Count of Total Confirmed Cases:\n${r}`,Extra.HTML().markup(
      m=>inline(m))
    )

}
)
})



bot.hears('North Region',ctx=>{
  var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
      if (err) {
        throw err;
      }
      var r=""
    
      var q=""
      var north=["Delhi","Haryana","Jammu and Kashmir","Himachal Pradesh","Uttar Pradesh","Punjab","Uttarakhand","Chandigarh"];
      for (i = 1; i <json.statewise.length; i++) {
        q = json.statewise[i].state;
        if(north.includes(q))
        {
        r += json.statewise[i].state;
        r+=' = <b>'+ json.statewise[i].confirmed+'</b>'
        r+='(+'+json.statewise[i].deltaconfirmed+')'
        r+='\n';
        }
      }
     ctx.reply(
     `North Region Count of Total Confirmed Cases:\n${r}`,Extra.HTML().markup(
      m=>inline1(m))
    )

}
)
})


bot.hears('South Region',ctx=>{
  var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
      if (err) {
        throw err;
      }
      var r=""
      var q=""
      var south=["Andaman and Nicobar Islands","Puducherry","Lakshadweep","Andhra Pradesh","Telangana","Tamil Nadu","Karnataka","Kerala"];
      for (i = 1; i <json.statewise.length; i++) {
        q = json.statewise[i].state;
        if(south.includes(q))
        {
        r += json.statewise[i].state;
        r+=' = <b>'+ json.statewise[i].confirmed+'</b>'
        r+='(+'+json.statewise[i].deltaconfirmed+')'
        r+='\n';
        }
      }
     ctx.reply(
     `South  Count of Total Confirmed Cases:\n${r}`,Extra.HTML().markup(
      m=>inline2(m))
    )

}
)
})

bot.hears('East Region',ctx=>{
  var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
      if (err) {
        throw err;
      }
      var r=""
      var q=""
      var east=["Bihar","Jharkhand","Odisha","West Bengal","Assam","Sikkim","Nagaland","Manipur","Mizoram","Meghalaya","Tripura","Arunachal Pradesh"];
      for (i = 1; i <json.statewise.length; i++) {
        q = json.statewise[i].state;
        if(east.includes(q))
        {
        r += json.statewise[i].state;
        r+=' = <b>'+ json.statewise[i].confirmed+'</b>'
        r+='(+'+json.statewise[i].deltaconfirmed+')'
        r+='\n';
        }
      }
     ctx.reply(
     `East Region Count of Total Confirmed Cases:\n${r}`,Extra.HTML().markup(
      m=>inline3(m)
     )
    )

}
)
})

bot.hears('West Region',ctx=>{
  var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
      if (err) {
        throw err;
      }
      var r=""
      var q=""
      var west=["Rajasthan","Gujarat","Goa","Maharashtra","Madhya Pradesh","Daman and Diu","Ladakh"];
      for (i = 1; i <json.statewise.length; i++) {
        q = json.statewise[i].state;
        if(west.includes(q))
        {
        r += json.statewise[i].state;
        r+=' = <b>'+ json.statewise[i].confirmed+'</b>'
        r+='(+'+json.statewise[i].deltaconfirmed+')'
        r+='\n';
        }
      }
     ctx.reply(
     `West Region Count of Total Confirmed Cases:\n${r}`,Extra.HTML().markup(
      m=>inline4(m)
     )
    )

}
)
})

const inline= (m)=>m.inlineKeyboard(
  [
  [m.callbackButton('Statewise Detailed List ↗️','Statewise Detailed List ↗️')]
  ]) 

  const inline1= (m)=>m.inlineKeyboard(
    [
    [m.callbackButton('North Region Detailed List ↗️','North Region Detailed List ↗️')]
    ]) 

    const inline2= (m)=>m.inlineKeyboard(
      [
      [m.callbackButton('South Region Detailed List ↗️','South Region Detailed List ↗️')]
      ]) 
   
      const inline3= (m)=>m.inlineKeyboard(
        [
        [m.callbackButton('East Region Detailed List ↗️','East Region Detailed List ↗️')]
        ]) 

        const inline4= (m)=>m.inlineKeyboard(
          [
          [m.callbackButton('West Region Detailed List ↗️','West Region Detailed List ↗️')]
          ]) 


  bot.hears('Active Cases',ctx=>{
      
       ctx.reply("hello",Extra.HTML()
      ) 
  
  })
  var west=["Rajasthan","Gujarat","Goa","Maharashtra","Madhya Pradesh","Daman and Diu","Ladakh"];
  bot.action('Statewise Detailed List ↗️',ctx=>
  ctx.reply
  ('Customized Selection',
  Markup.keyboard(
    [
      ['Delhi','Haryana','Himachal Pradesh'],
      ['Uttar Pradesh','Punjab','Uttarakhand'],
      ['Puducherry','Lakshadweep','Andhra Pradesh'],
      ['Telangana','Tamil Nadu','Karnataka','Kerala'],
      ['Bihar','Jharkhand','Odisha','West Bengal'],
      ['Assam','Sikkim','Nagaland','Manipur'],
      ['Mizoram','Tripura','Arunachal Pradesh'],
      ['Rajasthan','Gujarat','Goa'],
      ['Ladakh','Daman and Diu','Madhya Pradesh'],
      ['Jammu and Kashmir','Chandigarh','Maharashtra'],
      ['Andaman and Nicobar Islands','Meghalaya']
    ]
    )
  .resize().extra()))

  bot.action('West Region Detailed List ↗️',ctx=>
  ctx.reply
  ('Customized Selection',
  Markup.keyboard(
    [
      ['Rajasthan','Gujarat','Maharashtra'],
      ['Ladakh','Daman and Diu','Madhya Pradesh'],
      ['Goa']
    ]
    )
  .resize().extra()))


  bot.action('East Region Detailed List ↗️',ctx=>
  ctx.reply
  ('Customized Selection',
  Markup.keyboard(
    [

      ['Bihar','Jharkhand','Odisha'],
      ['Assam','Sikkim','Nagaland'],
      ['Mizoram','Meghalaya','Tripura'],
      ['Manipur','West Bengal','Arunachal Pradesh']
    ]
    )
  .resize().extra()))


  bot.action('North Region Detailed List ↗️',ctx=>
  ctx.reply
  ('Customized Selection',
  Markup.keyboard(
    [
      ['Delhi','Haryana','Jammu and Kashmir'],
      ['Uttar Pradesh','Punjab','Uttarakhand'],
      ['Himachal Pradesh',,'Chandigarh']
    ]
    )
  .resize().extra()))


  bot.action('South Region Detailed List ↗️',ctx=>
  ctx.reply
  ('Customized Selection',
  Markup.keyboard(
    [
      ['Andaman and Nicobar Islands','Puducherry'],
      ['Telangana','Tamil Nadu','Karnataka'],
      ['Lakshadweep','Kerala','Andhra Pradesh']
    ]
    )
  .resize().extra()))


//   bot.hears(('Tamil Nadu'),ctx=>{
//     var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
//         if (err) {
//           throw err;
//         }
//         for (i = 1; i <json.statewise.length; i++) {
//          if(json.statewise[i].state=='Tamil Nadu')
//          {
//           var ta=json.statewise[i].active;
//           var tc=json.statewise[i].confirmed;
//           var dd=json.statewise[i].deaths;
//           var dr=json.statewise[i].recovered;
//           var date=json.statewise[i].lastupdatedtime;
//          }
//         }

//        ctx.reply(
//         `Tamil Nadu updates as on <b>${date}</b>\nTotal Cases <b>${tc}</b> ↗️\nActive Cases <b>${ta}</b> ↗️\nTotal Recovered <b>${dr}</b> ↗️\nTotal Death <b>${dd}</b> 🔴\n`,Extra.HTML()
//       )

// }
// )
// })







textHandler(bot)





bot.launch()