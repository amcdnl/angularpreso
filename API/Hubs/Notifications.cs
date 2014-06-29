using System;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System.Collections.Generic;
using API.Models;
using System.Threading.Tasks;
using System.Linq;
using MongoDB.Bson;

namespace API.Hubs
{
    [HubName("Notifications")]
    public class Notifications : Hub
    {
        public void Send(string id, Dictionary<string, string> value)
        {
            // Call the broadcastMessage method to update clients.
            Clients.Others.broadcastMessage(id, value);
        }

        private InMemoryRepository _repository;

        public Notifications()
        {
            _repository = InMemoryRepository.GetInstance();
        }

        public override Task OnDisconnected()
        {
            string userId = _repository.GetUserByConnectionId(Context.ConnectionId);
            if (userId != null)
            {
                ApplicationUser user = _repository.Users.Where(u => u.Id == userId).FirstOrDefault();
                if (user != null)
                {
                    _repository.Users.Remove(user);
                    return Clients.All.leaves(user.Id, user.UserName, DateTime.Now);
                }
            }

            return base.OnDisconnected();
        }

        public void Joined()
        {
            ApplicationUser user = new ApplicationUser()
            {
                Id = ObjectId.GenerateNewId().ToString(),
                UserName = Clients.Caller.username
            };

            _repository.Users.Add(user);
            _repository.AddMapping(Context.ConnectionId, user.Id);
            Clients.All.joins(user.Id, Clients.Caller.username, DateTime.Now);
        }

        public ICollection<ApplicationUser> GetConnectedUsers()
        {
            return _repository.Users;
        }

    }
} 