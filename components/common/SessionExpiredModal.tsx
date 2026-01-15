import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";

type Props = {
    isOpen: boolean;
    title?: string;
    description?: string;
    onConfirm: () => void;
};

export default function SessionExpiredModal({
    isOpen,
    title = "Session expired",
    description = "No session found, please login again.",
    onConfirm,
}: Props) {
    return (
        <Modal
            isOpen={isOpen}
            isDismissable={false}
            radius="lg"
            backdrop="blur"
            classNames={{
                base: "max-w-sm",
                header: "text-lg font-semibold",
                body: "text-sm text-foreground/80",
            }}
        >
            <ModalContent>
                <ModalHeader>
                    <span className="text-red-500">Session Expired</span>
                </ModalHeader>

                <ModalBody>
                    <p className="leading-relaxed">
                        {description}
                    </p>
                </ModalBody>

                <ModalFooter className="gap-2">
                    <Button
                        color="primary"
                        className="w-full"
                        onPress={onConfirm}
                    >
                        Login Again
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

    );
}
