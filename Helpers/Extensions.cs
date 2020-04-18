using System;
using Microsoft.AspNetCore.Http;

namespace turism.Helpers
{
    public static class Extensions  // ca sa nu cream instante noi ca sa folosim metodele o facem statica.    
     {
         public static void AddApplicationError(this HttpResponse response, string message)
         {
             response.Headers.Add("Application-Error", message); // mesaju va fi valoarea
             response.Headers.Add("Access-Control-Expose-Headers", "Application-Error"); //va face posibila afisarea
             response.Headers.Add("Acces-Control-Allow-Origin", "*"); // wildcardu inseamna toate
         }

         public static int CalculateAge(this DateTime theDateTime) // dc nu in clasa user ci static?
         {
             var age = DateTime.Today.Year- theDateTime.Year;
             if(theDateTime.AddYears(age) > DateTime.Today) // ce e cu adyears?? rescriem
                age--;

            return age;
         }
        
    }
}