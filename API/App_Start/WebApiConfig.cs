using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System.Web.Http.Cors;
using Newtonsoft.Json.Serialization;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Reflection;
using System.Net.Http.Formatting;
using System;
using Newtonsoft.Json.Linq;
using MongoDB.Bson.Serialization.Options;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.IO;
using MongoDB.Bson;

namespace API
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver =
                new CamelCasePropertyNamesContractResolver();

            config.Formatters.JsonFormatter.SerializerSettings.DateFormatHandling =
                DateFormatHandling.IsoDateFormat;

            config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling =
                ReferenceLoopHandling.Serialize;

            config.Formatters.JsonFormatter.SerializerSettings.TypeNameHandling = 
                TypeNameHandling.Objects;

            config.Formatters.JsonFormatter.SerializerSettings.Converters.
                Add(new StringEnumConverter { CamelCaseText = true });

            config.Formatters.JsonFormatter.SerializerSettings.NullValueHandling = 
                NullValueHandling.Include;
        }
    }
}
