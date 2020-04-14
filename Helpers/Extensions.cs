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
        
    }
}