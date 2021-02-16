export const tokenPassTextMessage = (username: string, tokenPassUrl: string) => `
Olá, ${username}, seja bem vindo ao 4lifeapp 😊. Seu registro está quase completo, só falta agora você confirmar a sua conta. Isso pode ser feito clicando no link abaixo.\n
${tokenPassUrl}
`

export const tokenPassHTMLMessage = (username: string, tokenPassUrl: string) => `
<head>
<link href="https://fonts.googleapis.com/css2?family=Dosis:wght@400;500&display=swap" rel="stylesheet">
</head>

<body>
  <div class="box-content">
    <div class="title-text">Olá ${username}, seja bem vindo ao 4lifeapp 😊</div>
    
    <div class="content-text">
      Seu registro está quase completo, só falta agora você confirmar a sua conta. Isso pode ser feito clicando no link abaixo.
      
      <div class="access-link"><a href="${tokenPassUrl}">${tokenPassUrl}</a></div>
    </div>

    
  </div>
</body>

<style>
  body {
    font-family: "Dosis", sans-serif;
  }
  
  .box-content {
        width: 400px;
        height: 300px;
        padding: 20px 20px;
        background-color: rgb(249, 249, 249);

        line-height: 150%;
    
        margin-left: auto;
        margin-right: auto;
    
        border-radius: 8px;
        box-shadow: rgb(0,0,0,.1) 2px 1px 10px, rgb(0,0,0,.1) -2px 1px 10px;
    
        border: 2px solid rgb(121, 172, 248, .05);
  }
  
 .title-text {
    color: #5698fa;
    font-size: 1.3rem;
    line-height: 180%;
  }
  
.content-text {
    margin-top: 10px;
    color: #3D3D3D;
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  .access-link {
    margin-top: 20px;
    text-decoration: underline;
  }
  
  .access-link a {
    color: #5698fa;
  }
</style>`

export default tokenPassHTMLMessage;