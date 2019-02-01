/* eslint-disable */
const sgMail = require('@sendgrid/mail')
require('dotenv').config()

exports.handler = async function(event) {
  // -- We only care to do anything if this is our POST request.
  if (event.httpMethod !== 'POST' || !event.body) {
    return {
      statusCode: 405,
      headers,
      body: 'Method Not Allowed',
    }
  }

  // -- Parse the body contents into an object.
  const request = JSON.parse(event.body)
  console.log(`This is the data send to lambda function: ${event.body}`)
  const { email, name } = request.event.data.old
  console.log(email, name)
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  try {
    const msg = {
      to: `uri875@gmail.com`,
      from: 'contacte@lapastanagadelrei.cat',
      subject: 'Has estat eliminat del joc',
      text: `Ens sap greu però has estat eliminat del joc de La Pastanaga del Rei.`,
      html: `<p>Eliminat!</p>`,
    }
    const resSgMail = await sgMail.send(msg)
    console.log(resSgMail)
  } catch (err) {
    console.log(err.toString())
    return {
      statusCode: 500,
      error: JSON.stringify(err),
    }
  }

  console.log('Email send correctly')
  const responseBody = {
    status: 'Email send correctly to player',
  }
  return {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  }
}
