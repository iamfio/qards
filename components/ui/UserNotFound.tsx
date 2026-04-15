import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UserNotFound() {
  return (
    <div className="flex h-full items-center justify-center py-12">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-5xl">🤷</CardTitle>
          <CardDescription className="pt-4 text-lg">
            User Not Found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The user you are looking for does not exist.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            asChild
            variant="outline"
          >
            <Link href="/">Go Back</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
