"use client";

import React, {useEffect, useRef} from "react";
import {useLayoutProvider} from "@/components/layout-context";
import {neueMontreal} from "@/config/fonts";

const fakeProjects = [
    {
        'id': 0,
        'title': 'Meno',
        'slug': 'meno',
        'brief': 'Audio live streaming application for Christian faithful.',
        'tools': 'Flutter, LiveKit, Socket.io'
    },
    {
        'id': 1,
        'title': 'PediVel - Club Management Suite',
        'slug': 'pedivel',
        'brief': 'Club management suite for clubs in Nigeria',
        'tools': 'Flutter, Firebase, RestAPI, Pusher'
    },
    {
        'id': 2,
        'title': 'FitTrack Pro',
        'slug': 'fittrack-pro',
        'brief': 'Comprehensive fitness tracking and workout planning mobile app.',
        'tools': 'Flutter, GraphQL, PostgreSQL, Redux'
    },
    {
        'id': 3,
        'title': 'LocalMart',
        'slug': 'localmart',
        'brief': 'E-commerce platform connecting local vendors with customers.',
        'tools': 'React Native, Stripe, MongoDB, Node.js'
    },
    {
        'id': 4,
        'title': 'StudyBuddy',
        'slug': 'studybuddy',
        'brief': 'Collaborative learning platform for students and tutors.',
        'tools': 'Flutter, WebRTC, Firebase, Agora'
    },
    {
        'id': 5,
        'title': 'MediCare Connect',
        'slug': 'medicare-connect',
        'brief': 'Telemedicine app connecting patients with healthcare providers.',
        'tools': 'Flutter, Twilio, AWS, Stripe'
    },
    {
        'id': 6,
        'title': 'TaskFlow',
        'slug': 'taskflow',
        'brief': 'Project management tool with real-time collaboration features.',
        'tools': 'React, Socket.io, Redis, Express'
    },
    {
        'id': 7,
        'title': 'FoodieHub',
        'slug': 'foodiehub',
        'brief': 'Food delivery app with AI-powered restaurant recommendations.',
        'tools': 'Flutter, TensorFlow Lite, Google Maps API, Firebase'
    },
    {
        'id': 8,
        'title': 'PropertyFinder',
        'slug': 'propertyfinder',
        'brief': 'Real estate marketplace for buying, selling, and renting properties.',
        'tools': 'Vue.js, Mapbox, PostgreSQL, Elasticsearch'
    },
    {
        'id': 9,
        'title': 'LinguaLearn',
        'slug': 'linguallearn',
        'brief': 'Language learning app with gamification and speech recognition.',
        'tools': 'Flutter, Google Cloud Speech-to-Text, Firebase, ML Kit'
    },
    {
        'id': 10,
        'title': 'BudgetWise',
        'slug': 'budgetwise',
        'brief': 'Personal finance management app with expense tracking and insights.',
        'tools': 'Kotlin Multiplatform, SQLDelight, Chart.js, Plaid API'
    },
    {
        'id': 11,
        'title': 'EventSync',
        'slug': 'eventsync',
        'brief': 'Event management platform with ticketing and attendee engagement.',
        'tools': 'Flutter, Stripe Connect, SendGrid, AWS Lambda'
    }
];

export const Projects = () => {
    const {registerSection, unregisterSection} = useLayoutProvider();
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (sectionRef.current) {
            registerSection('projects', sectionRef.current);
        }

        // Cleanup on unmount
        return () => unregisterSection('projects');
    }, [registerSection, unregisterSection]);

    return (
        <section
            id={'projects'}
            ref={sectionRef}
            className='h-screen grid app-margin w-full gap-4 grid--app-columns'
        >
            <div className='mt-11 content flex flex-col gap-8'>
                <h1 className="font-medium uppercase tracking-wider text-sm">Recent Projects</h1>
                <ul className="py-12 flex flex-col gap-12">
                    {fakeProjects.map((project) => (
                        <li key={project.id}>
                            <h3 className={`${neueMontreal.className} font-neue text-7xl font-thin`}>{project.title}</h3>
                            <p className="text-xl font-light">{project.brief}</p>
                            <small
                                className="text-xs opacity-70 tracking-widest uppercase">{project.tools}</small>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};
