using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API.Models
{
    public class InMemoryRepository
    {
        private static Dictionary<string, string> _mappings;
        private static InMemoryRepository _instance = null;
        private static readonly int max_random = 3;

        public InMemoryRepository()
        {
            Users = new List<ApplicationUser>();
            _mappings = new Dictionary<string, string>();
        }

        public static InMemoryRepository GetInstance()
        {
            if (_instance == null)
            {
                _instance = new InMemoryRepository();
            }
            return _instance;
        }

        public List<ApplicationUser> Users { get; set; }

        public string GetRandomizedUsername(string username)
        {
            string tempUsername = username;
            int newRandom = max_random, oldRandom = 0;
            int loops = 0;
            Random random = new Random();
            do
            {
                if (loops > newRandom)
                {
                    oldRandom = newRandom;
                    newRandom *= 2;
                }
                username = tempUsername + "_" + random.Next(oldRandom, newRandom).ToString();
                loops++;
            } while (GetInstance().Users.Where(u => u.UserName.Equals(username)).ToList().Count > 0);

            return username;
        }

        public void AddMapping(string connectionId, string userId)
        {
            if (!string.IsNullOrEmpty(connectionId) && !string.IsNullOrEmpty(userId))
            {
                _mappings.Add(connectionId, userId);
            }
        }

        public string GetUserByConnectionId(string connectionId)
        {
            string userId = null;
            _mappings.TryGetValue(connectionId, out userId);
            return userId;
        }
    }
}