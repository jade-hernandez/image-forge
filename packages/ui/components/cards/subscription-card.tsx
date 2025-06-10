import { cn } from "../../lib/utils";
import { Button } from "../button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../card";
import { List } from "../lists/list";

interface ISubscriptionCard {
  subscription: {
    heading: string;
    features: string[];
    price: number;
    period?: string;
    isFeatured?: boolean;
    callToAction?: string;
  },
  className?: string;
};

const SubscriptionCard = (props: ISubscriptionCard) => {
  const {
    heading,
    features,
    price,
    period,
    isFeatured = false,
    callToAction,
  } = props.subscription;

  return (
    <Card
      className={cn(
        "w-[300px] h-[440px]",
        "transition-transform duration-200 ease-in-out transform hover:scale-[101%]",
        "",
        isFeatured
          ? "border border-neutral-950 shadow-md shadow-neutral-950/10 scale-105 hover:scale-[106%]"
          : "",
        props.className
      )}
    >
      <CardHeader>
        {isFeatured && (
          <CardDescription className="font-semibold text-neutral-950 bg-cyan-400 absolute top-24 w-[180px] text-center -right-8 h-fit px-6 py-2 trabsform rotate-45 origin-top-right">
            Most Popular
          </CardDescription>
        )}
        <CardTitle className="pt-2">
          <span className="text-2xl font-bold text-neutral-950">{heading}</span>
          <br />
          <span className="text-2xl font-bold text-neutral-950">${price}</span>
          <span className="pl-0.5 text-sm text-neutral-400 font-normal" >
            /{period || "month"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <List items={features} />
      </CardContent>
      <CardFooter>
        <Button
          variant={isFeatured ? "default" : "outline"}
          className={cn(
            "w-full border transition-colors duration-200 ease-in-out",
            isFeatured
              ? "bg-zinc-950 text-white hover:bg-zinc-50 hover:text-zinc-950"
              : "bg-card hover:bg-zinc-950 hover:text-white",
          )}
        >
          {callToAction || "Get Started"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export { SubscriptionCard, type ISubscriptionCard };

