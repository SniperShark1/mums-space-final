import { Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type GroupActivityCardProps = {
  name: string;
  description: string;
};

export function GroupActivityCard({ name, description }: GroupActivityCardProps) {
  return (
    <Card className="bg-white rounded-xl p-4 mb-6 shadow-sm">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Avatar className="w-10 h-10 bg-pink-light">
            <AvatarFallback>
              <Users className="h-5 w-5 text-pink-600" />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-grow">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-quicksand font-semibold">{name}</span>
            <span className="text-gray-400 text-xs">New activity</span>
          </div>
          <div className="font-opensans text-gray-700 text-base">
            <p>{description}</p>
          </div>
          <div className="mt-3">
            <Button className="bg-pink-soft hover:bg-pink-600 text-white px-4 py-1.5 rounded-full text-sm transition-colors">
              Visit Group
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
