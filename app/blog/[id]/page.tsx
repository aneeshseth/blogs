"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ArrowLeft } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

const blogs: Blog[] = [
  {
    id: "1",
    title: "Data movement tools - Part 1 (Data Extraction)",
    date: "Nov 6, 2025",
    excerpt: "Challenges in building data movement tools",
    content: `
I currently work at a Series A company (Monad.com), where I work on building ETL flows for customers to move security data. I’ve been learning about this space for the last ~1.5 years, and this write up is generally an amalgamation of some of my learnings. 

Setting the scenario: ETL stands for data extraction, transformation, and loading. Data extraction refers to the retrieval of data from any external source, which in a lot of cases is done via external platform APIs. This would involve hitting the third party provider’s API, where we would get the designated data from. The type of data could vary based on the usecase, but this could be anything from Audit logs to Customer event data to security vulnerabilities to system logs to data from object stores to any marketing data for example. Other ways of fetching data include publisher subsriber models (eg: salesforce events streams), where you could subscribe to a stream of data from a third party provider, and your service listening to data from that stream would receive that data and you would then process it. 

There are 2 main modes of data extraction from these generic data sources. Data could either be pulled as a full snapshot, or in an incremental way. For example, if we’re looking to pull out vulnerability data, security teams often want a snapshot of data, and hence we pull out all vulnerabilities in the system so the security team can get their snapshot of data. However, if a team is looking to fetch and gain visibility into a platform’s audit logs, they tend to be incremental in nature. Incremental here means that every single time we fetch data from the third party platform, we only process data that we haven’t processed before. 

Pulling data as a snapshot requires hitting the external API and processing all records each time. However, there are several challenges with processing incremental data, which only get more complicated as we move to wanting diffs in data in object stores, or data retrieved from physical assets. Even for data sources which can be accessed via an API, the fundamental challenge is to deduplicate and not loss out on any data. We cannot just store all the data in a database/cache each time to deduplicate the data on the next sync since the amount of data could be really large (100s of GB, TBs, etc. scale) per platform customer. Each API also works in different ways, some allowing to pass in a timestamp as a query parameter/within the request body to help process data from a certain point to help with only processing diffs in data, while some no (object stores like S3/GCS/Azue blob storage for example). Some use GraphQL, some use streaming mechanisms to pull data, and some use a REST interface. This problem also requires standardization across the different integerations and the different types (streaming, REST, GraphQL, etc.) that are being supported to make sure there’s a well defined interface for how an integration is written for good developer experience. 

The more tricky parts are to create visibility into these extraction flows around how much data is being processed, at what throughput, and other such metrics, along with making this system resilient for failure scenarios like if this service was hosted on AWS and AWS went down for example. We need to ensure no data being lost while data is deduplicated despite any failures once the system is back up. And most importantly, APIs are hard. It is one thing to build a data extraction service, another deal to maintain it. Schemas change, which are hidden by tiny marketing emails, and poor status codes returned, incorrect/incomplete documentation, poorly written SDKs/APIs, etc. 

These touch on a few challenges faced in building a data extraction service. The next iteration of this write up would be about some other part of this system.
      `,
  },
  {
    id: "2",
    title: "Data movement tools - Part 2 (Data Loading)",
    date: "Nov 12, 2025",
    excerpt: "Challenges in building data movement tools",
    content: `
I currently work at Monad.com, where I work on building data heavy workflows for customers to move security data. I’ve been learning about this space for the last ~1.5 years, and this write up is generally an amalgamation of my learnings. 

Setting the scenario: ETL stands for data extraction, transformation, and loading. Data extraction refers to the retrieval of data from any external source, which in a lot of cases is done via external platform APIs. This would involve hitting the third party provider’s API, where we would get the designated data from. The type of data could vary based on the usecase, but this could be anything from Audit logs to Customer event data to security vulnerabilities to system logs to data from object stores to any marketing data for example. The second step is transformation, which as the name suggests is a step that is involved in transforming the data, and the last step being load, which is to send the data to any form of data storage (a SIEM, a datalake, a database, an object store, etc). Data loading in most cases involves using the third party platform’s API/SDKs to send data in. 

There are 2 main modes of sending data to a destination, firstly batching, and secondly individual records being sent. Sending individual data refers to sending each data record one after the other via the third party’s API after it has been extracted from the third party source in the extract step and has gone through data transformation too. The second method refers to batching data, which is to send N records to the destination in a single API call. Batching is generally considered more efficient, since it allows with dealing with potentially heavy throughput from the extract service. Most data lakes, popular SIEM’s, etc. support batching data. 

The number N (which is total records to send in an API call to batch data into a destination) can vary based on the destination. These data lakes can usually send upto a certain number of records in a single call to their API, or are even limited by the size of data being sent in bytes. Dealing with heavy throughput on the load service coming from the extract service is an interesting challenge. For example, the extract service may be shredding out a TB worth of data within an hour or two since there is a very large amount of data in the customer’s third party source that’s being pulled from, however, it is not feasible to send a TB or even around a GB of data in a single batch API call to any service. Most services would return an error. This introduces the need for limiting batch sizes when calling the API, and this batch size can differ per destination connector. Batch sizes are usually measured by number of records and the size of the batch, hence, as data flows in from the extract and transform steps, we form batches which are eventually sent to the destination via their API. It is also important to consider backoffs, given if we hit rate limits, or if the destination (for example: snowflake) is down, we need to make sure we backoff at exponential time frames (concept called exponential backoffs). 

Once we have data flowing, it is also important to look into how we can optimize time it takes to send N records to the destination platform through their API along with costs for the destination platform we’re sending data to for customers, and that could be through better handling of connection pooling with the destination to ensure high throughput, or making sure active connections are cleaned up, ensuring good error handling with backoffs based on the type of error, etc. This gets trickier when dealing with data warehouses like snowflake which present multiple ways to send data (by staging the data - https://docs.snowflake.com/en/user-guide/data-load-considerations-stage, or by doing direct inserts), and understanding tradeoffs there. 
      `,
  },
];

export default function BlogPage() {
  const params = useParams();
  const id = params.id as string;

  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Blog not found
            </h1>
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to all posts
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border px-8 py-12 hidden md:block sticky top-16 h-[calc(100vh-4rem)]">
          <div className="space-y-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>

            <div>
              <h1 className="text-2xl font-semibold text-foreground mb-2">
                Aneesh Seth
              </h1>
              <p className="text-muted-foreground text-sm">
                Thoughts on engineering
              </p>
            </div>

            <nav className="space-y-4">
              <div className="h-px bg-border"></div>
              <Link
                href="/"
                className="block text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
              >
                All Posts
              </Link>
              <div className="h-px bg-border"></div>
            </nav>
          </div>
        </aside>

        <div className="flex-1 px-6 md:px-12 py-12 max-w-3xl mx-auto w-full">
          <Link
            href="/"
            className="md:hidden flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all posts
          </Link>

          <article>
            <div className="mb-8">
              <h1 className="text-4xl font-semibold text-foreground mb-3">
                {blog.title}
              </h1>
              <time className="text-sm text-muted-foreground">{blog.date}</time>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-foreground/80 leading-relaxed text-lg whitespace-pre-wrap">
                {blog.content}
              </p>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
