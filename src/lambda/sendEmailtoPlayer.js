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
      to: `${name} <${email}>`,
      from: 'La Pastanaga del Rei <contacte@lapastanagadelrei.cat>',
      subject: 'Has estat eliminat del joc',
      text: `Ens sap greu però has estat eliminat del joc de La Pastanaga del Rei.`,
      html: `<html>
      <head>
        <style type="text/css">
          .ExternalClass,.ExternalClass div,.ExternalClass font,.ExternalClass p,.ExternalClass span,.ExternalClass td,img{line-height:100%}#outlook a{padding:0}.ExternalClass,.ReadMsgBody{width:100%}a,blockquote,body,li,p,table,td{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{mso-table-lspace:0;mso-table-rspace:0}img{-ms-interpolation-mode:bicubic;border:0;height:auto;outline:0;text-decoration:none}table{border-collapse:collapse!important}#bodyCell,#bodyTable,body{height:100%!important;margin:0;padding:0;font-family:ProximaNova,sans-serif}#bodyCell{padding:20px}#bodyTable{width:600px}@font-face{font-family:ProximaNova;src:url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-regular-webfont-webfont.eot);src:url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-regular-webfont-webfont.eot?#iefix) format('embedded-opentype'),url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-regular-webfont-webfont.woff) format('woff');font-weight:400;font-style:normal}@font-face{font-family:ProximaNova;src:url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-semibold-webfont-webfont.eot);src:url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-semibold-webfont-webfont.eot?#iefix) format('embedded-opentype'),url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-semibold-webfont-webfont.woff) format('woff');font-weight:600;font-style:normal}@media only screen and (max-width:480px){#bodyTable,body{width:100%!important}a,blockquote,body,li,p,table,td{-webkit-text-size-adjust:none!important}body{min-width:100%!important}#bodyTable{max-width:600px!important}#signIn{max-width:280px!important}}
        </style>
      </head>
      <body>
        <center>
          <table style="width: 600px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: 0;padding: 0;font-family: &quot;ProximaNova&quot;, sans-serif;border-collapse: collapse !important;height: 100% !important;" align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
            <tr>
              <td align="justify" valign="top" id="bodyCell" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: 0;padding: 20px;font-family: &quot;ProximaNova&quot;, sans-serif;height: 100% !important;">
              <div class="main">
                <p style="text-align: center;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%; margin-bottom: 30px;">
                  <img src="https://res.cloudinary.com/okstudio/image/upload/v1547740222/icon.png" width="150" alt="Logo de la Pastanaga del Rei" style="-ms-interpolation-mode: bicubic;border: 0;height: auto;line-height: 100%;outline: none;text-decoration: none;">
                </p>
                <h1>${name} estàs mort/a!</h1>
                <p>Ens sap greu comunicar-te que has estat eliminat del joc de La Pastanaga del Rei.</p>
                <br>
                <br>
                Moltes gràcies per participar!
                <br></br>
                <p><strong>La comissió organitzadora de La Pastanaga del Rei</strong></p>
                <br>
                <br>
                <hr style="border: 2px solid #EAEEF3; border-bottom: 0; margin: 20px 0;">
                <p style="text-align: center;color: #A9B3BC;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;">
                  Si has rebut aquest correu és perque et vas inscriure al joc de La Pastanaga del Rei 2019. Pots contactar amb nosaltres a contacte@lapastanagadelrei.cat
                </p>
              </div>
              </td>
            </tr>
          </table>
        </center>
      </body>
    </html>`,
    }
    const resSgMail = await sgMail.send(msg)
  } catch (err) {
    console.log(err.toString())
    return {
      statusCode: 500,
      error: JSON.stringify(err),
    }
  }

  console.log('Email send correctly')
  const responseBody = {
    status: `Email send correctly to ${name} - ${email}`,
  }
  return {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  }
}
