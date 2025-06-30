'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="healthcare-container gradient-healthcare-bg">
      <div className="min-h-screen flex items-center justify-center">
        <div className="healthcare-card max-w-md mx-4">
          <div className="healthcare-card-content text-center">
            <div className="icon-container-warning mx-auto mb-6">
              <ArrowLeft className="w-8 h-8 text-white rotate-180" />
            </div>
            <h1 className="text-2xl text-gray-800 mb-4">
              페이지를 찾을 수 없습니다
            </h1>
            <p className="text-healthcare-muted mb-6">
              요청하신 페이지가 존재하지 않습니다.
            </p>
            <Link href="/" className="btn-healthcare-primary inline-block">
              메인으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}