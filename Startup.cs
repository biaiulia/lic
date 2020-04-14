using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using turism.Data;
using turism.Helpers;

namespace turism
{
    public class Startup
    {
        public Startup(IConfiguration configuration) //injectie de configuratie
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) //container de dependency injection
        {
            services.AddDbContext<DataContext>(x => x.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));//prin injectare conectam
            services.AddControllers();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            services.AddCors(); //adauga serviciul cors ca sa il facem available ca middleware prin injection
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(
                options => { options.TokenValidationParameters = new TokenValidationParameters{
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Token").Value)), // cheia e string dar ne trebe ByteArray
                    ValidateIssuer = false,
                    ValidateAudience = false

                };
                });
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) //middleware 
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage(); //face exceptiile ca alerte pe pag
            }
          else
                app.UseExceptionHandler(builder =>{
                   builder.Run(async context => { context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                   
                   var error = context.Features.Get<IExceptionHandlerFeature>();
                   if(error != null)
                   {

                       context.Response.AddApplicationError(error.Error.Message);
                       await context.Response.WriteAsync(error.Error.Message); // aici scriem eroare in http response
                   }
                   });
                   // metoda extensie
               }); // adauga middleware in pipeline si log la exceptii

            //app.UseHttpsRedirection();

            app.UseRouting(); //middleware

            app.UseCors( x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()); // ca sa evitam eroarea de securitate


            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => 
            {
                endpoints.MapControllers();
            });
        }
    }
}
