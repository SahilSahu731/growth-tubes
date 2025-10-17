"use client";

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { getUserProfile } from '@/services/userService';
import { User } from '@/types/user';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Mail, User as UserIcon, Award, BookOpen, Heart, Edit } from 'lucide-react';
import EditProfileModal from '@/components/EditProfileModal';

const ProfilePage = () => {
  const { token, user: authUser } = useAuthStore();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const response = await getUserProfile(token);
        setUser(response.user);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!user) {
    return <div className="text-center py-8">Failed to load profile</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.profilePic} alt={user.username} />
              <AvatarFallback className="bg-green-100 text-green-600 text-2xl font-bold">
                {user.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900">{user.username}</h1>
                <Badge variant={user.subscription?.isActive ? 'default' : 'secondary'}>
                  {user.subscription?.plan.toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              <p className="text-gray-700">
                {user.bio || 'No bio available. Add a bio to tell others about yourself!'}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <EditProfileModal user={user} onUpdate={setUser} />
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">{user.curiosityPaths?.length}</p>
            <p className="text-sm text-gray-600">Learning Paths</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-yellow-600">{user.curiosityPaths?.filter(p => p.completed).length}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-red-600">{user?.savedResources?.length}</p>
            <p className="text-sm text-gray-600">Saved Resources</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <UserIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">{user?.boards?.length}</p>
            <p className="text-sm text-gray-600">Boards</p>
          </CardContent>
        </Card>
      </div>

      {/* Learning Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Progress</CardTitle>
        </CardHeader>
        <CardContent>
          {user?.curiosityPaths?.length > 0 ? (
            <div className="space-y-4">
              {user?.curiosityPaths?.map((path, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">{path.pathId?.title || 'Untitled Path'}</h4>
                    <p className="text-sm text-gray-600">{path.pathId?.description || 'No description available'}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{path.progress}%</div>
                    {path.completed && <Badge className="bg-green-100 text-green-800">Completed</Badge>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No learning paths started yet. Explore our courses to begin your journey!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Interests */}
      <Card>
        <CardHeader>
          <CardTitle>Interests</CardTitle>
        </CardHeader>
        <CardContent>
          {user.interests.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest, index) => (
                <Badge key={index} variant="secondary">{interest}</Badge>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No interests added yet. Add your interests to get personalized recommendations!</p>
          )}
        </CardContent>
      </Card>

      {/* Recent Journal Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Growth Journal</CardTitle>
        </CardHeader>
        <CardContent>
          {user?.growthJournal?.length > 0 ? (
            <div className="space-y-4">
              {user?.growthJournal?.slice(0, 3).map((entry, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{entry.entry}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Edit className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No journal entries yet. Start documenting your growth journey!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
