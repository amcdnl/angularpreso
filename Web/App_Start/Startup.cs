using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using Microsoft.Owin.Host.SystemWeb;

[assembly: OwinStartup(typeof(Web.Startup))]

namespace Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            ConfigureSignalR(app);
        }
    }
}
