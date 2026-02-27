import { Card } from './ui/Card';
import '../index.css'; // Ensure we have access to global styles

export function AnimeGallery() {
    const images = [
        {
            src: '/assets/titan.png',
            alt: 'Colossal Titan',
            title: 'The Colossal Threat',
            description: 'A dramatic view of the Colossal Titan looking over the massive stone wall.'
        },
        {
            src: '/assets/scout.png',
            alt: 'Scout Regiment',
            title: 'Vertical Maneuvering',
            description: 'A scout swinging through a European-style city in dynamic action.'
        },
        {
            src: '/assets/scenery.png',
            alt: 'Walled City',
            title: 'Peace within Walls',
            description: 'A serene yet ominous landscape of a walled medieval city.'
        }
    ];

    return (
        <section className="anime-gallery">
            <h2 className="section-title">Attack on Titan Insights</h2>
            <div className="image-grid">
                {images.map((img, index) => (
                    <Card key={index} className="image-card">
                        <div className="image-wrapper">
                            <img src={img.src} alt={img.alt} className="gallery-image" />
                            <div className="image-overlay">
                                <h3>{img.title}</h3>
                                <p>{img.description}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}
