import Link from "next/link";

export default function Footer() {
  return (
    <div>
      <footer className="bg-light text-center text-lg-start mt-16">
        <div className="container p-4">
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h5 className="font-bold pb-3 text-2xl">Audio Party</h5>

              <p>
                Audio Party is a simple application that allows users to share
                songs with other people! Users can comment and discuss songs as
                well. Discover music, explore new things, and connect with other
                people.
              </p>
            </div>

            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h5 className="font-bold pb-3 text-2xl">More Information</h5>

              <p>
                For more information, feel free to contact me at
                <span className="text-blue-500">
                  {" "}
                  <Link href="mailto:zhang.nicholas136@gmail.com">
                    zhang.nicholas136@gmail.com
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center p-3">
          © 2021 Copyright:
          <a className="text-dark" href="https://github.com/nickzswammer">
            Nicholas Zhang
          </a>
        </div>
      </footer>
    </div>
  );
}
