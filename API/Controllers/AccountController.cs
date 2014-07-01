using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web;
using Microsoft.AspNet.Identity;
using System.Web.Configuration;
using System.Threading.Tasks;
using System.Web.Security;
using System.Net;
using API.Models.Identity;
using MongoDB.Bson;
using API.Hubs;

namespace API.Controllers
{
    public class AccountController : ApiController
    {
        #region Public Methods

        public AccountController()
        {
            // Supress redirection for web services
            HttpContext.Current.Response.SuppressFormsAuthenticationRedirect = true;
        }

        [AllowAnonymous]
        [HttpPost, Route("api/account/login")]
        public HttpResponseMessage Login(LoginViewModel model)
        {
            var authenticated = model.UserName ==
                    "admin" && model.Password == "admin";

            if (authenticated)
            {
                var claims = new List<Claim>();
                claims.Add(new Claim(ClaimTypes.Email, model.UserName));
                var id = new ClaimsIdentity(claims, DefaultAuthenticationTypes.ApplicationCookie);

                var ctx = Request.GetOwinContext();
                var authenticationManager = ctx.Authentication;
                authenticationManager.SignIn(id);

                return Request.CreateResponse(HttpStatusCode.OK);
            }

            return new HttpResponseMessage(HttpStatusCode.BadRequest);
        }

        [Authorize]
        [HttpGet, Route("api/account/profile")]
        public HttpResponseMessage Profile()
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<object>(new
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    UserName = "User " + new Random().Next(1, 10)
                }, Configuration.Formatters.JsonFormatter)
            };
        }

        [Authorize]
        [HttpPost, Route("api/account/logout")]
        public void Logout()
        {
            var ctx = Request.GetOwinContext();
            var authenticationManager = ctx.Authentication;
            authenticationManager.SignOut();
        }

        #endregion
    }
}

