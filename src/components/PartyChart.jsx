import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import HomeTest from "./Header";
import { CategoriesNav, BreadcrumbNav, SectionTitle } from "./common";
import { fetchStatisticalAnalysis } from "../api/services/all.service";

const PartyChart = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [partyData, setPartyData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadStatisticalData = async () => {
      try {
        setLoading(true);
        const data = await fetchStatisticalAnalysis();
        setPartyData(data);
      } catch (error) {
        console.error("Error loading statistical analysis:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStatisticalData();
  }, []);

  useLayoutEffect(() => {
    if (loading || partyData.length === 0) return;

    // Create root element
    let root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(50),
      })
    );

    // Create series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "number_of_seats",
        categoryField: "name_of_party",
        alignLabels: false,
      })
    );

    // Hide labels
    series.labels.template.set("visible", false);
    series.ticks.template.set("visible", false);

    // Configure tooltip
    series.slices.template.setAll({
      tooltipText: "{name_of_party}: {number_of_seats} seats",
      strokeWidth: 2,
      stroke: am5.color(0xffffff),
    });

    // Set data
    series.data.setAll(partyData);

    // Create legend
    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
      })
    );

    legend.data.setAll(series.dataItems);

    // Play initial series animation
    series.appear(1000, 100);

    chartRef.current = root;

    return () => {
      root.dispose();
    };
  }, [loading, partyData]);

  return (
    <div className="wrapper ovh">
      <header
        className={`header-nav nav-homepage-style2 stricky main-menu ${
          isScrolled ? "scrolled-nav slideInDown animated" : "slideIn animated"
        }`}
      >
        <HomeTest />
      </header>

      <div className="body_content">
        <CategoriesNav />
        <BreadcrumbNav
          breadcrumbs={[
            { name: "Home", href: "/" },
            { name: "Statistical Analysis", href: "/party-chart" },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb30 pb30-md represent">
          <div className="container">
            <SectionTitle title="Party Wise Representation" />

            {loading ? (
              <div className="text-center py-5">
                <p>Loading chart data...</p>
              </div>
            ) : (
              <div className="bill-content col-md-12 mt30">
                <div
                  id="chartdiv"
                  style={{ width: "100%", height: "600px" }}
                ></div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PartyChart;
