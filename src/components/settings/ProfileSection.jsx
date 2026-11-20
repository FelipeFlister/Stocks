import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { Camera, Save, User as UserIcon } from "lucide-react";

export default function ProfileSection() {
  const { data: currentUser } = useCurrentUser();
  const qc = useQueryClient();
  const { toast } = useToast();
  const fileInputRef = useRef(null);

  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.display_name || currentUser.full_name || "");
      setAvatarUrl(currentUser.avatar_url || "");
    }
  }, [currentUser]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setAvatarUrl(file_url);
      await base44.auth.updateMe({ avatar_url: file_url });
      qc.invalidateQueries({ queryKey: ["current-user"] });
      toast({ title: "Foto de perfil atualizada" });
    } catch (err) {
      toast({ title: "Erro ao atualizar foto", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSaveName = async () => {
    try {
      setSaving(true);
      await base44.auth.updateMe({ display_name: displayName });
      qc.invalidateQueries({ queryKey: ["current-user"] });
      toast({ title: "Nome de perfil atualizado" });
    } catch (err) {
      toast({ title: "Erro ao atualizar nome", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const initials = (currentUser?.full_name || currentUser?.email || "U")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserIcon className="w-5 h-5" />
          Perfil
        </CardTitle>
        <CardDescription>Gerencie seu nome e foto de perfil</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="w-20 h-20">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Camera className="w-4 h-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          <div>
            <p className="text-sm font-medium">{currentUser?.full_name || currentUser?.email}</p>
            <p className="text-xs text-muted-foreground">Clique na câmera para alterar a foto</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="display-name">Nome de perfil</Label>
          <div className="flex gap-2">
            <Input
              id="display-name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Seu nome"
            />
            <Button onClick={handleSaveName} disabled={saving || !displayName.trim()}>
              <Save className="w-4 h-4" />
              {saving ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}