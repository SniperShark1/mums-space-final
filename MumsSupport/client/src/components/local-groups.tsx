import { useQuery } from "@tanstack/react-query";
import { Group } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

export function LocalGroups() {
  // Fetch groups
  const { data: groups, isLoading, error } = useQuery<Group[]>({
    queryKey: ["/api/groups"],
  });

  // Join group mutation
  const joinGroupMutation = useMutation({
    mutationFn: async (groupId: number) => {
      const res = await apiRequest("POST", `/api/groups/${groupId}/join`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/groups"] });
    },
  });

  const handleJoinGroup = (groupId: number) => {
    joinGroupMutation.mutate(groupId);
  };

  // Display only 2 groups for the homepage preview
  const displayGroups = groups?.slice(0, 2) || [];

  return (
    <div className="mb-6">
      <h2 className="font-quicksand text-xl font-bold text-gray-800 mb-3">Local Mum Groups</h2>
      
      {isLoading ? (
        <div className="flex justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin text-pink-soft" />
        </div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">
          Failed to load groups. Please try again.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {displayGroups.map(group => (
              <Card key={group.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="h-32 w-full">
                  <img 
                    src={group.imageUrl} 
                    alt={group.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-quicksand font-semibold text-lg">{group.name}</h3>
                      <p className="text-gray-500 text-sm">{group.distance} · {group.memberCount} members</p>
                    </div>
                    <Button 
                      className="bg-pink-soft hover:bg-pink-600 text-white px-4 py-1 rounded-full text-sm transition-colors"
                      onClick={() => handleJoinGroup(group.id)}
                      disabled={joinGroupMutation.isPending}
                    >
                      Join
                    </Button>
                  </div>
                  <p className="text-gray-700 mt-2 text-sm">{group.description}</p>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-4">
            <Button variant="link" className="text-pink-600 font-medium" onClick={() => window.location.href = '/groups'}>
              Show more groups near you
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
