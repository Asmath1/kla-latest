"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function PartyDashboard() {
  const [activeTab, setActiveTab] = useState("party");
  const [currentPage, setCurrentPage] = useState(0);

  const parties = [
    [
      { abbr: "LDF", count: 61, name: "Communist Party Of India (Marxist)" },
      { abbr: "INC", count: 20, name: "Indian National Congress" },
      { abbr: "CPI", count: 17, name: "Communist Party Of India" },
    ],

    [
      { abbr: "IUML", count: 15, name: "Indian Union Muslim League" },
      { abbr: "KEC(M)", count: 5, name: "Kerala Congress (M)" },
      { abbr: "I", count: 2, name: "Independents" },
    ],

    [
      { abbr: "NCP", count: 15, name: "Nationalist Congress Party" },
      { abbr: "JDS", count: 5, name: "Janata Dal (Secular)" },
      { abbr: "I", count: 5, name: "Kerala Congress" },
    ],

    [
      { abbr: "ERD", count: 2, name: "Nationalist Congress Party" },
      { abbr: "TES", count: 2, name: "Janata Dal (Secular)" },
      { abbr: "VGR", count: 2, name: "Kerala Congress" },
    ],

    [
      { abbr: "BNH", count: 1, name: "National Secular Conference" },
      { abbr: "SA", count: 1, name: "Congress (Secular)" },
      { abbr: "MKJ", count: 1, name: "Kerala Congress (Jacob)" },
    ],

    [
      { abbr: "TRT", count: 1, name: "Revolutionary Marxist Part Of India" },
      { abbr: "POIU", count: 1, name: "Independent" },
      { abbr: "MER", count: 1, name: "Loktantrik Janta Dal" },
    ],

    [
      { abbr: "IY", count: 1, name: "Kerala Congress (B)" },
      { abbr: "JGT", count: 1, name: "Janadhipathya Kerala Congress" },
      { abbr: "UIY", count: 1, name: "Indian National League" },
    ],
  ];

  const totalPages = parties.length;

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <div className="flex space-x-4">
          <Button
            variant={activeTab === "party" ? "default" : "outline"}
            onClick={() => setActiveTab("party")}
          >
            Party
          </Button>
          <Button
            variant={activeTab === "district" ? "default" : "outline"}
            onClick={() => setActiveTab("district")}
          >
            District
          </Button>
          <Button
            variant={activeTab === "members" ? "default" : "outline"}
            onClick={() => setActiveTab("members")}
          >
            Members
          </Button>
        </div>
      </div>

      {activeTab === "party" && (
        <div className="tab-pane show active" role="tabpanel">
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {parties[currentPage].map((party, index) => (
                <Card
                  key={index}
                  className="overflow-hidden shadow hover:shadow-md transition-shadow"
                >
                  <div className="bg-purple-200 p-2 text-center font-medium">
                    {party.abbr}
                  </div>
                  <div className="p-4 text-center">
                    <div className="text-4xl font-bold mb-2">{party.count}</div>
                    <h5 className="text-sm font-medium">{party.name}</h5>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex justify-center items-center mt-6 space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevPage}
                className="rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {Array.from({ length: totalPages }).map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full cursor-pointer ${
                    currentPage === index ? "bg-black" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentPage(index)}
                />
              ))}

              <Button
                variant="outline"
                size="icon"
                onClick={nextPage}
                className="rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* District Content */}
      {activeTab === "district" && (
        <div className="tab-pane show active" role="tabpanel">
          {/* District content here */}
        </div>
      )}

      {/* Members Content */}
      {activeTab === "members" && (
        <div className="tab-pane show active" role="tabpanel">
          {/* Members content here */}
        </div>
      )}
    </div>
  );
}
