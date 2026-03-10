import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";

export function useMembers() {
  return useQuery({
    queryKey: [api.members.list.path],
    queryFn: async () => {
      const res = await fetch(api.members.list.path);
      if (!res.ok) throw new Error("Failed to fetch members");
      return api.members.list.responses[200].parse(await res.json());
    },
  });
}

export function useMyMember() {
  return useQuery({
    queryKey: [api.members.getMine.path],
    queryFn: async () => {
      const res = await fetch(api.members.getMine.path);
      if (!res.ok) throw new Error("Failed to fetch member details");
      return api.members.getMine.responses[200].parse(await res.json());
    },
  });
}

export function useUpdateMemberStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: 'pending' | 'verified' | 'blocked' }) => {
      const url = buildUrl(api.members.updateStatus.path, { id });
      const res = await fetch(url, {
        method: api.members.updateStatus.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      return api.members.updateStatus.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.members.list.path] });
    },
  });
}
