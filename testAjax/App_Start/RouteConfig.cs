using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace testAjax
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapRoute(
                name: "ProductDetail",
                url: "hquan261203{id}",
                defaults: new { controller = "Product", action = "ProductDetail", id = UrlParameter.Optional }
            );

            routes.MapRoute(
            name: "SanPham'sPage",
            url: "ban-phim",
            defaults: new { controller = "Product", action = "Index", _maTheLoai = 1 }
            );

            routes.MapRoute(
            name: "Chuot'sPage",
            url: "chuot",
            defaults: new { controller = "Product", action = "Index", _maTheLoai = 2 }
            );

            routes.MapRoute(
            name: "Decor'sPage",
            url: "decor",
            defaults: new { controller = "Product", action = "Index", _maTheLoai = 3 }
            );
            
            routes.MapRoute(
            name: "TayCam'sPage",
            url: "tay-cam",
            defaults: new { controller = "Product", action = "Index", _maTheLoai = 4 }
            );

            routes.MapRoute(
            name: "TaiNghe'sPage",
            url: "tai-nghe",
            defaults: new { controller = "Product", action = "Index", _maTheLoai = 5 }
            );
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
