using API.Hubs;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Owin;

namespace Web
{
    public partial class Startup
    {
        public void ConfigureSignalR(IAppBuilder app)
        {
            var hubConfiguration = new HubConfiguration();
            hubConfiguration.EnableDetailedErrors = true;
            hubConfiguration.EnableJavaScriptProxies = false;
            app.MapSignalR(hubConfiguration);
        }
    }
}
