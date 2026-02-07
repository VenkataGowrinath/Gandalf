import React, { useMemo, useCallback } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Circle,
  OverlayView,
} from '@react-google-maps/api';
import type { Group, CommunityMember } from '../types';

const mapCenter = { lat: 17.4485, lng: 78.3908 };
const defaultZoom = 16;
const mapContainerStyle = { width: '100%', height: '100%' };
const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  zoomControlOptions: { position: 9 }, // RIGHT_BOTTOM
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ],
};

interface MapViewProps {
  group: Group;
}

export function MapView({ group }: MapViewProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const hasApiKey = Boolean(apiKey?.trim());
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey?.trim() || 'no-key',
    preventGoogleFontsLoading: true,
  });

  const allMembers = useMemo(
    () => [group.currentUser, ...group.members],
    [group]
  );

  const assistanceMember = useMemo(
    () =>
      allMembers.find(
        (m) => m.status.type === 'assistance_radius' && m.assistanceRadiusMeters
      ),
    [allMembers]
  );

  const renderMarkerContent = useCallback(
    (member: (typeof allMembers)[0], isMoving: boolean) => (
      <div className="relative flex flex-col items-center">
        <div className="relative flex flex-col items-center">
          {isMoving && (
            <div
              className="absolute -inset-3 animate-pulse rounded-full opacity-70"
              style={{
                background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)',
                boxShadow: '0 0 0 3px rgba(139,92,246,0.35)',
              }}
            />
          )}
          <div
            className={`relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-white bg-slate-100 shadow-soft ${isMoving ? 'ring-2 ring-violet-400 ring-offset-2' : ''}`}
          >
            <img
              src={member.avatar}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        {isMoving && member.status.type === 'moving' && (
          <div className="absolute top-full left-1/2 z-10 mt-1 flex -translate-x-1/2 flex-col items-center gap-0.5">
            <div className="flex items-center gap-1.5 rounded-xl bg-violet-100 px-3 py-2 text-xs font-semibold text-violet-900 shadow-md">
              <svg className="h-3.5 w-3.5 shrink-0 text-violet-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              <span>{(member.status as { text: string }).text}</span>
            </div>
            <span className="rounded-xl bg-violet-50 px-2.5 py-1 text-[10px] font-semibold text-violet-700 shadow-sm">
              {member.name} is 3 min away from you
            </span>
          </div>
        )}
      </div>
    ),
    []
  );

  if (loadError && hasApiKey) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-100 p-4 text-center text-sm text-red-600">
        Map failed to load. Check your Google Maps API key and console.
      </div>
    );
  }

  if (!hasApiKey || !isLoaded) {
    return (
      <FallbackMap
        allMembers={allMembers}
        assistanceMember={assistanceMember ?? null}
        renderMarkerContent={renderMarkerContent}
      />
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={mapCenter}
      zoom={defaultZoom}
      options={mapOptions}
    >
      {assistanceMember && assistanceMember.assistanceRadiusMeters && (
        <Circle
          center={assistanceMember.position}
          radius={assistanceMember.assistanceRadiusMeters}
          options={{
            fillColor: '#34d399',
            fillOpacity: 0.15,
            strokeColor: '#34d399',
            strokeOpacity: 0.4,
            strokeWeight: 2,
          }}
        />
      )}
      {allMembers.map((member) => {
        const isMoving = member.status.type === 'moving';
        return (
          <OverlayView
            key={member.id}
            position={member.position}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            getPixelPositionOffset={() => ({ x: -20, y: -20 })}
          >
            {renderMarkerContent(member, isMoving)}
          </OverlayView>
        );
      })}
    </GoogleMap>
  );
}

// Fallback when no Google Maps API key: simple styled map-like background with positioned avatars
function FallbackMap({
  allMembers,
  assistanceMember,
  renderMarkerContent,
}: {
  allMembers: CommunityMember[];
  assistanceMember: CommunityMember | null;
  renderMarkerContent: (member: CommunityMember, isMoving: boolean) => React.ReactNode;
}) {
  const positions = useMemo(() => {
    const base = { x: 50, y: 50 };
    return allMembers.map((m, i) => ({
      member: m,
      style: {
        left: `${base.x + (i % 3) * 18 - 15}%`,
        top: `${base.y + Math.floor(i / 3) * 12 - 10}%`,
      },
    }));
  }, [allMembers]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      {/* Fake street grid - soft lines */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute left-1/4 top-0 h-full w-px bg-slate-200" />
        <div className="absolute left-2/4 top-0 h-full w-px bg-slate-200" />
        <div className="absolute left-3/4 top-0 h-full w-px bg-slate-200" />
        <div className="absolute left-0 top-1/3 w-full border-t border-slate-200" />
        <div className="absolute left-0 top-2/3 w-full border-t border-slate-200" />
      </div>
      {/* Street labels */}
      <div className="absolute left-[20%] top-3 text-[11px] font-semibold text-slate-600">
        Chesapeake Ave
      </div>
      <div className="absolute right-[18%] top-1/2 -rotate-90 text-[11px] font-semibold text-slate-600">
        Southwood
      </div>
      <div className="absolute bottom-10 left-[12%] text-[11px] font-semibold text-slate-600">
        Whittier Street
      </div>
      <div className="absolute bottom-6 right-[20%] text-[11px] font-semibold text-slate-600">
        McDowell
      </div>
      <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[11px] font-semibold text-slate-600">
        Dresden Street
      </div>
      {/* Assistance radius - soft emerald glow */}
      {assistanceMember && (
        <div
          className="absolute h-52 w-52 rounded-full"
          style={{
            left: '50%',
            top: '48%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(52,211,153,0.22) 0%, rgba(52,211,153,0.06) 50%, transparent 70%)',
            border: '1px solid rgba(52,211,153,0.25)',
          }}
        />
      )}
      {/* Avatars */}
      {positions.map(({ member, style }) => (
        <div
          key={member.id}
          className="absolute z-10 transition-transform"
          style={style}
        >
          {renderMarkerContent(member, member.status.type === 'moving')}
        </div>
      ))}
    </div>
  );
}
