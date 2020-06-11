using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using System.Runtime.Serialization;
using System.Text;
using System.Text.Json.Serialization;

namespace turism.Models {
    public class City {
        public int Id {
            get;
            set;
        }

        public string Name {
            get;
            set;
        }

        public string Description {
            get;
            set;
        }

        public string Url {
            get;
            set;
        }

        public string PublicId { get; set; }

        [JsonIgnore]
        [IgnoreDataMember]
        public ICollection < Post > Posts {
            get;
            set;
        }


}
}