
const express = require('express') //подключаем экспресс
const config = require('config')//подключение пакета который позволяет вынести конфигурационные константы  в отдельную папку config 
//  в которой должны быть два файла json default.json- на этапе разработки, production.json - используется на стадии сборки продакшен
const path = require('path') //для работы с путями

const mongoose = require('mongoose')

const app = express() // создаем основную переменную для прослушивания порта

const Group = require('./models/group')
const BlogPost = require('./models/blogPost')


app.use(express.json({ extended: true })) // для правильной интерпритации body в запросах от client мы должны включить этот MiddleWare

// пропишем роуты для авторизации и логина создаем папку routes
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes')) // подключаем для обработки запросов связаных с ссылками 02:11:50
app.use('/t', require('./routes/redirect.routes'))

if (process.env.NODE_ENV === 'production') {//условие для продакшена 
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = config.get('port') || 5000 //получаем из конфига константу PORT по умолчанию равную 5000
const MONGO_Uri = config.get('mongoUri')

console.log( MONGO_Uri )

async function start() {
  try {
    await 
    mongoose //возвращает Promise (оборачиваем в функцию только для использования async await
    .connect( MONGO_Uri, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => console.log(`Server is runed on port ${PORT}...`))
    //.catch(err=>console.log('Connection to MongoDB is Error', e.message) )

    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))

    const doc = new Group({
      name: 'Jedi Order',
      // M2: [{ firstName: 'Luke', lastName: 'Skywalker' }]
    });
    await doc.save();
    
    mongoose.set('debug', true);
    
    console.log("doc",doc);

    doc["M2"][0].firstName = 'Anakin';
    doc.M2.push({ firstName: 'Luke', lastName: 'Skywalker2' })
    doc["M2"].push({ })
    doc["M1"].push({ })
    // Prints:
    // Mongoose: groups.updateOne({ _id: ObjectId("...") },
    // { '$set': { 'members.0.firstName': 'Anakin' } }, { session: null })
    
    await doc.save();

    const fromDb = await Group.findOne({ _id: doc._id });
    

     console.log("doc",fromDb["M2"].length,fromDb);


     






  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()


