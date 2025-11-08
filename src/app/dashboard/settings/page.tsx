'use client';

import { RiShieldCheckLine, RiKey2Line, RiTeamLine, RiNotificationLine } from 'react-icons/ri';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account and security</p>
      </div>

      <div className="grid gap-6">
        {/* Security */}
        <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <RiShieldCheckLine className="text-2xl text-accent" />
            <h2 className="text-xl font-bold text-white">Security</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#0d0d0d]">
              <span className="text-white">Two-Factor Authentication</span>
              <button className="px-4 py-2 rounded-lg bg-accent text-white text-sm">Enable</button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#0d0d0d]">
              <span className="text-white">Session Timeout</span>
              <span className="text-gray-400">30 minutes</span>
            </div>
          </div>
        </div>

        {/* API Keys */}
        <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <RiKey2Line className="text-2xl text-accent" />
            <h2 className="text-xl font-bold text-white">API Keys</h2>
          </div>
          <button className="px-4 py-2 rounded-lg bg-white/5 border border-gray-800 text-white hover:border-accent transition-all">
            Generate New API Key
          </button>
        </div>

        {/* Team */}
        <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <RiTeamLine className="text-2xl text-accent" />
            <h2 className="text-xl font-bold text-white">Team Members</h2>
          </div>
          <p className="text-gray-400">Invite team members to collaborate</p>
        </div>

        {/* Notifications */}
        <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <RiNotificationLine className="text-2xl text-accent" />
            <h2 className="text-xl font-bold text-white">Notifications</h2>
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-white">Email notifications</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-white">Slack notifications</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
