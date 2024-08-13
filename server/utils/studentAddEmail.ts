export const studentAddEmail = (student: any) => ({
  from: `Rapid Services Solutions <${process.env.EMAIL_FROM}>`,
  to: `${process.env.EMAIL_TO}, ${student?.email}`,
  subject: `New student registeration`,
  html: `<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
  
  <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
      style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
      <tr>
          <td>
              <table style="background-color: #f2f3f8; max-width:770px;  margin:0 auto;" width="100%" border="0"
                  align="center" cellpadding="0" cellspacing="0">
                  
                  <tr>
                      <td style="height:20px;">&nbsp;</td>
                  </tr>
                  <tr>
                      <td>
                          <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                              style="max-width:770px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                              <tr>
                                  <td style="height:40px;">
                                  <div style="text-align:center; margin-bottom: 2rem; margin-top: 1rem">
                                    <img src="https://rapidservicessolutions.co.uk/wp-content/uploads/2024/05/logo-01-1.png" alt="Logo" style="width: 150px; height: auto" />
                                  </div>
                                  </td>
                                  
                              </tr>
                              <tr>
                                <td style="padding:0 32px;">
                                <h6 style="color:#1e1e2d; font-weight:500; margin:0; font-size:24px; margin-bottom:8px; font-family:'Rubik',sans-serif; text-align:initial">New Student Registeration</h6>
                                <span style="display:block; margin:12px 0; border-bottom:1px solid #cecece; width:260px;"></span>
                                
                                <div style="font-weight:500; font-size:18px; display:flex;">
                                Name: <span style="font-weight:600; font-size:18px; display:flex; margin-left:8px;"> ${student?.firstName + " " + student?.surname}</span>
                                </div>
                                <div style="font-weight:500; font-size:18px; display:flex; margin-top:8px;">
                                Phone: <span style="font-weight:600; font-size:18px; display:flex; margin-left:8px;"> ${student?.mobile}</span>
                                </div>
                                <div style="font-weight:500; font-size:18px; display:flex; margin-top:8px;">
                                Email: <span style="font-weight:600; font-size:18px; display:flex; margin-left:8px;"> ${student?.email}</span>
                                </div>
                                <div style="font-weight:500; font-size:18px; display:flex; margin-top:8px;">
                                Registration ID: <span style="font-weight:600; font-size:18px; display:flex; margin-left:8px;"> ${student?.registrationId}</span>
                                </div>

                                </td>
                                </tr>
                              <tr>
                                  <td style="height:40px;">&nbsp;</td>
                              </tr>
                          </table>
                      </td>
                      <tr>
                      <td style="height:40px;">&nbsp;</td>
                  </tr>
              </table>
          </td>
      </tr>
  </table>
</body>`,
});
