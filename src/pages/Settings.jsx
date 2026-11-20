import React from "react";
import ProfileSection from "@/components/settings/ProfileSection";
import BackupSection from "@/components/settings/BackupSection";
import ImportBackupSection from "@/components/settings/ImportBackupSection";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Configurações</h1>
        <p className="text-muted-foreground text-sm">Gerencie sua conta e preferências</p>
      </div>
      <div className="max-w-2xl space-y-6">
        <ProfileSection />
        <BackupSection />
        <ImportBackupSection />
      </div>
    </div>
  );
}