import Image from "next/image";

export function FacilityFilmstrip({ photos }: { photos: readonly { id: string; image: string }[] }) {
  return (
    <div className="filmstrip" role="list" aria-label="Ảnh không gian trị liệu thực tế tại Lake beauty">
      {photos.map((photo) => (
        <div className="filmstrip-item" role="listitem" key={photo.id}>
          <Image src={photo.image} alt="Không gian trị liệu tại Lake beauty" fill sizes="320px" className="filmstrip-photo" />
        </div>
      ))}
    </div>
  );
}
