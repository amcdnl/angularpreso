using Microsoft.AspNet.Identity;
using MongoDB.AspNet.Identity;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace API.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Fullname { get; set; }

        public string Email { get; set; }

        public string Telephone { get; set; }

        public DateTime Created { get; set; }

        public DateTime? LastLogin { get; set; }

        public bool Active { get; set; }

        [BsonIgnore]
        public bool IsMe { get; set; }

        public string ImageId { get; set; }
    }
}