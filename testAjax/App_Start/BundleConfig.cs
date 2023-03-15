using System.Web;
using System.Web.Optimization;

namespace testAjax
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));
            bundles.Add(new ScriptBundle("~/bundles/loginscript").Include(
                        "~/js/LoginScript.js"));
            bundles.Add(new ScriptBundle("~/bundles/product").Include(
                        "~/Areas/Admin/js/product.js"));
            bundles.Add(new ScriptBundle("~/js/Home").Include(
                        "~/js/Home.js"));
            bundles.Add(new ScriptBundle("~/AllProduct.js").Include(
                        "~/js/AllProducts.js"));
            bundles.Add(new ScriptBundle("~/LoadProductFuntion").Include(
                        "~/js/LoadProductFuntion.js"));
            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
            bundles.Add(new StyleBundle("~/css/LoginCss").Include(
                      "~/css/LoginCss.css"));
            bundles.Add(new StyleBundle("~/bundles/p_css").Include(
                      "~/Areas/Admin/css/p.css"));
            bundles.Add(new StyleBundle("~/css/Homecss").Include(
                      "~/css/Home.css"));
            bundles.Add(new StyleBundle("~/css/AllProducts.css").Include(
                      "~/css/AllProducts.css"));
            bundles.Add(new StyleBundle("~/myProduct.css").Include(
                      "~/css/myProduct.css"));
        }
    }
}
