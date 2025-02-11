const Faq = () => {
  return (
    <div id="faq" className="bg-black py-20">
        <h1 className="text-6xl text-center py-8">Frequently Asked Questions</h1>
      <div className="flex container m-auto flex-col items-center justify-center space-y-2 p-4">
        <div className="collapse bg-base-200 p-4">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            How long will it take to build my website?
          </div>
          <div className="collapse-content">
            <p>
              The timeline depends on the complexity and features of your
              website. A basic website with a few pages can take 1–2 weeks,
              while a more complex site with custom designs, e-commerce, or
              advanced functionality can take 3–6 weeks. I’ll provide you with a
              detailed timeline after understanding your specific requirements.
            </p>
          </div>
        </div>
        <div className="collapse bg-base-200 p-4">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            Will my website be mobile-friendly?
          </div>
          <div className="collapse-content">
            <p>
              Absolutely! All websites I build are fully responsive, meaning
              they look great and function seamlessly on all devices, including
              desktops, tablets, and smartphones. A mobile-friendly website is
              essential for user experience and SEO rankings.
            </p>
          </div>
        </div>
        <div className="collapse bg-base-200 p-4">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            Will my website be optimized for search engines (SEO)?
          </div>
          <div className="collapse-content">
            <p>
              Yes, I include basic SEO optimization in every project. This
              includes fast loading speeds, mobile responsiveness,
              keyword-optimized content, meta tags, and clean code. If you want
              more advanced SEO services, like keyword research or ongoing
              optimization, I offer those as well. Let’s discuss what’s best for
              your business goals!
            </p>
          </div>
        </div>
        <div className="collapse bg-base-200 p-4">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            Can I make changes to the website after it’s launched?
          </div>
          <div className="collapse-content">
            <p>
              Yes, you can request changes anytime after the website is
              launched. Since I code all my websites from scratch, any updates
              or modifications will be handled directly through coding. This
              approach ensures your website remains clean, optimized, and
              tailored to your needs. If you need updates or additional
              features, simply let me know, and I’ll make the necessary changes
              for you. Blogs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;